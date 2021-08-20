;; Composite key Approach for storing messages between two users
(define-map messages-map { usernames: { sender: (string-ascii 20), reciever: (string-ascii 20) } } { content: {message:  (list 50 (string-ascii 100)), time: (string-ascii 20) } })

;; For Storing Username of each account
(define-map usernames-map { wallet-address: principal  } { username: (string-ascii 20) } )

;; For Storing Friends List of each user
(define-map friends-map { username: (string-ascii 20) } { friends: (list 50 (string-ascii 20)) } )

;; For Storing pending friend request List of each user
(define-map pending-friend-requests-map { username: (string-ascii 20) } { requests: (list 50 (string-ascii 20)) } )

;; For Storing Friend request Status
(define-map friend-request-status-map { usernames: { sender: (string-ascii 20), reciever: (string-ascii 20) } } { accepted: bool } )

;; Default message for first-time
(define-data-var default-message (list 50 (string-ascii 100)) (list ""))

;; Default friends list / pending list
(define-data-var default-friends (list 50 (string-ascii 20)) (list ""))

;; ----------------------------------------Public Functions-------------------------------------

(define-public (send-message (sender (string-ascii 20)) (reciever (string-ascii 20)) (text (string-ascii 100)) (time (string-ascii 20)))
    (let 
        (
            ;; if sending message for the first time then default to first-message else get list of previously sent messages
            (messages (default-to (var-get default-message) ( get message (get content (map-get? messages-map { usernames: { sender: sender, reciever: reciever } })))))
        )
        
        ;; (print messages)
        
        (ok (map-set messages-map { usernames: { sender: sender, reciever: reciever } } { content: { message: (unwrap-panic (as-max-len? (append messages text) u50)), time: time }} ))
        
    )
)

(define-public (add-new-username (wallet-address principal) (username (string-ascii 20) ) )
    (ok (map-insert usernames-map {wallet-address: wallet-address} { username: username } ))
)

(define-public (send-friend-request (sender (string-ascii 20)) (reciever (string-ascii 20)))
    (let
        (
            (pending-reciever-friend-requests (default-to (var-get default-friends) ( get requests (map-get? pending-friend-requests-map { username: reciever }))))
        )

        (asserts!
        (or
        (is-eq (are-friends sender reciever) (some true))
        (is-eq (are-friends reciever sender) (some true))
        ) 
        (err false)
        )
        (map-set pending-friend-requests-map { username: reciever } {requests: (unwrap-panic (as-max-len? (append pending-reciever-friend-requests sender) u50))})
        (ok (map-set friend-request-status-map { usernames: { sender: sender, reciever: reciever } } { accepted: false }))
    )
)

(define-public (accept-friend-request (sender (string-ascii 20)) (reciever (string-ascii 20)))
    (let
        (
            (sender-friends (default-to (var-get default-friends) ( get friends (map-get? friends-map { username: sender }))))
            (reciever-friends (default-to (var-get default-friends) ( get friends (map-get? friends-map { username: reciever }))))
        )

        (map-set friend-request-status-map { usernames: { sender: sender, reciever: reciever } } { accepted: true })
        (map-set friends-map { username: sender } {friends: (unwrap-panic (as-max-len? (append sender-friends reciever) u50))})
        (map-set friends-map { username: reciever } {friends: (unwrap-panic (as-max-len? (append reciever-friends sender) u50))})
        (ok true)
    )
)

;; ----------------------------------------Private Functions-------------------------------------

(define-private (are-friends (sender (string-ascii 20)) (reciever (string-ascii 20)))
    (get accepted (map-get? friend-request-status-map { usernames: { sender: sender, reciever: reciever } }))
)

(define-private (get-username (wallet-address principal))
    (get username (map-get? usernames-map {wallet-address: wallet-address} ))
)

;; ----------------------------------------Read-Only Functions-------------------------------------

(define-read-only (get-messages (sender (string-ascii 20)) (reciever (string-ascii 20)))
    (let 

        (
            (messages (get message (get content (unwrap! (map-get? messages-map { usernames: { sender: sender, reciever: reciever } }) (err (var-get default-message))))))
        )
        
        ;; (print messages)
        
        ;; return list of messages between the two users where the calling user sent the message.
        (ok messages)
        
    )
)

(define-read-only (is-new-user (wallet-address principal))
    (is-none (map-get? usernames-map {wallet-address: wallet-address} ))
)

(define-read-only (get-friends-list (username (string-ascii 20)))
    (let 

        (
            (friends (get friends (unwrap! (map-get? friends-map  { username: username }) (err (var-get default-friends)))))
        )
        
        ;; (print friends)
        
        ;; return list of messages between the two users where the calling user sent the message.
        (ok friends)
    )
)

(define-read-only (get-pending-friend-requests (username (string-ascii 20)))
    (let 

        (
            (pending-friend-requests (get requests (unwrap! (map-get? pending-friend-requests-map { username: username }) (err (var-get default-friends)))))
        )
        
        ;; (print pending-friend-requests)
        
        ;; return list of messages between the two users where the calling user sent the message.
        (ok pending-friend-requests)
    )
)





