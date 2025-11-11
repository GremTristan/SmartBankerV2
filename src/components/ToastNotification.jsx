import { useState, useEffect } from 'react'
import './ToastNotification.css'

function ToastNotification() {
  const [notifications, setNotifications] = useState([])

  const messages = [
    { text: "Marie de Paris vient de rejoindre le mouvement", delay: 3000 },
    { text: "3 personnes se sont inscrites dans la dernière heure", delay: 8000 },
    { text: "127 personnes consultent cette page en ce moment", delay: 12000 },
    { text: "Thomas de Lyon vient de s'inscrire", delay: 15000 },
    { text: "5 nouvelles inscriptions aujourd'hui", delay: 20000 }
  ]

  useEffect(() => {
    let timeoutIds = []
    let removeTimeoutIds = []

    messages.forEach((message, index) => {
      const notificationId = Date.now() + index
      const timeoutId = setTimeout(() => {
        setNotifications(prev => [...prev, { id: notificationId, text: message.text }])
        
        // Retirer la notification après 4 secondes
        const removeTimeoutId = setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== notificationId))
        }, 4000)
        removeTimeoutIds.push(removeTimeoutId)
      }, message.delay)
      
      timeoutIds.push(timeoutId)
    })

    return () => {
      timeoutIds.forEach(id => clearTimeout(id))
      removeTimeoutIds.forEach(id => clearTimeout(id))
    }
  }, [])

  if (notifications.length === 0) return null

  return (
    <div className="toast-container">
      {notifications.map(notification => (
        <div key={notification.id} className="toast-notification">
          <div className="toast-notification__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 4V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="toast-notification__text">{notification.text}</span>
        </div>
      ))}
    </div>
  )
}

export default ToastNotification

