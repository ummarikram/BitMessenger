;; Composite key Approach
(define-map Messages-map { usernames: { sender: (string-ascii 10), reciever: (string-ascii 10) } } { message:  (list 50 (string-ascii 100)) } )

;; Default message for first-time
(define-data-var default (list 50 (string-ascii 100)) (list ""))
 
(define-public (send-message (sender (string-ascii 10)) (reciever (string-ascii 10)) (text (string-ascii 100)))
    (let 
        (
            (first-message (var-get default))

            ;; if sending message for the first time then default to first-message else get list of previously sent messages
            (messages (default-to first-message (get message (map-get? Messages-map { usernames: { sender: sender, reciever: reciever } }))))
        )
        
        ;; (print messages)
        
        (ok (map-set Messages-map { usernames: { sender: sender, reciever: reciever } } { message: (unwrap-panic (as-max-len? (append messages text) u50)) } ))
        
    )
)


(define-public (get-sent-messages (sender (string-ascii 10)) (reciever (string-ascii 10)))
    (let 

        (
            (messages (get message (unwrap! (map-get? Messages-map { usernames: { sender: sender, reciever: reciever } }) (err (var-get default)))))
        )
        
        ;; (print messages)
        
        ;; return list of messages between the two users where the calling user sent the message.
        (ok messages)
        
    )
)


(define-public (get-recieved-messages (sender (string-ascii 10)) (reciever (string-ascii 10)))
    (let 
    
        (
            (messages (get message (unwrap! (map-get? Messages-map { usernames: { sender: sender, reciever: reciever } }) (err (var-get default)))))
        )
        
        ;; (print messages)
        
        ;; return list of messages between the two users where the calling user recieved the message. 
        (ok messages)
    )
)
