import pusherJs from 'pusher-js'

const pusher = new pusherJs(process.env.REACT_APP_PUSHER_KEY, {
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  forceTLS: true
})

export default pusher
