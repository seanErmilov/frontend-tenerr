import { eventBus, showSuccessMsg } from '../services/event-bus.service'
import { useState, useEffect, useRef } from 'react'
import { SOCKET_EVENT_ORDER_ABOUT_YOU, SOCKET_EVENT_ORDER_STATUS_UPDATE, socketService } from '../socket.service'

export function UserMsg() {
	const [msg, setMsg] = useState(null)
	const timeoutIdRef = useRef()

	useEffect(() => {
		const unsubscribe = eventBus.on('show-msg', msg => {
			setMsg(msg)
			if (timeoutIdRef.current) {
				timeoutIdRef.current = null
				clearTimeout(timeoutIdRef.current)
			}
			timeoutIdRef.current = setTimeout(closeMsg, 3000)
		})

		socketService.on(SOCKET_EVENT_ORDER_ABOUT_YOU, order => {
			showSuccessMsg(`New order came in`)
		})

		socketService.on(SOCKET_EVENT_ORDER_STATUS_UPDATE, order => {
			console.log('order :', order)
			showSuccessMsg(`your order has been ${order.status}`)
		})


		return () => {
			unsubscribe()

			socketService.off(SOCKET_EVENT_ORDER_ABOUT_YOU)
			socketService.off(SOCKET_EVENT_ORDER_STATUS_UPDATE)

		}
	}, [])

	function closeMsg() {
		setMsg(null)
	}

	function msgClass() {
		return msg ? 'visible' : ''
	}
	return (
		<section className={`user-msg ${msg?.type} ${msgClass()}`}>
			<button onClick={closeMsg}>x</button>
			{msg?.txt}
		</section>
	)
}
