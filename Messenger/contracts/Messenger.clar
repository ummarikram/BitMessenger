;; For testing
;; (define-map Messages-map { sender: principal } { message:  (list 50 (string-ascii 100)) } )

;; Composite key Approach
(define-map Messages-map { users: { sender: principal, reciever: principal } } { message:  (list 50 (string-ascii 100)) } )

;; Default message for first-time
(define-data-var default (list 50 (string-ascii 100)) (list "Say Hi!"))
 
(define-public (send-message (reciever principal) (text (string-ascii 100)))
    (let 
        (
            (first-message (var-get default))

            ;; if sending message for the first time then default to first-message else get list of previously sent messages
            (messages (default-to first-message (get message (map-get? Messages-map { users: { sender: tx-sender, reciever: reciever } }))))
        )
        
        ;;(ok (print messages))
        
        (ok (map-insert Messages-map { users: { sender: tx-sender, reciever: reciever } } { message: (unwrap-panic (as-max-len? (append messages text) u50)) } ))
        
    )
)


(define-public (get-sent-messages (reciever principal))
    (let 

        (
            (messages (get message (unwrap! (map-get? Messages-map { users: { sender: tx-sender, reciever: reciever } }) (err (var-get default)))))
        )
        
        ;;(ok (print messages))
        
        ;; return list of messages between the two users where the calling user sent the message.
        (ok messages)
        
    )
)


(define-public (get-recieved-messages (sender principal))
    (let 
    
        (
            (messages (get message (unwrap! (map-get? Messages-map { users: { sender: sender, reciever: tx-sender } }) (err (var-get default)))))
        )
        
        ;;(ok (print messages))
        
        ;; return list of messages between the two users where the calling user recieved the message. 
        (ok messages)
    )
)
