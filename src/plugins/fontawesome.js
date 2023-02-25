import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faTrashCan, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome, faTrashCan, faBars, faXmark)

export default {
  install (app) {
    app.component('FontAwesomeIcon', FontAwesomeIcon)
  }
}
