import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
import getPageTitle from '@/utils/get-page-title'

router.beforeEach(async(to, from, next) => {
  // start progress bar

  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  next()
})

router.afterEach(() => {
  // finish progress bar
})
