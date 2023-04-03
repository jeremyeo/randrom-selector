export default function useCustomNav() {
  const sysInfo = uni.getSystemInfoSync()
  const buttonInfo = uni.getMenuButtonBoundingClientRect()

  const statusHeight = `${sysInfo.statusBarHeight!}px`
  const buttonToStatusBottom = buttonInfo.top - sysInfo.statusBarHeight!
  const buttonHeight = `${buttonInfo.height + 2 + buttonToStatusBottom * 2}px`

  return {
    sysInfo,
    buttonInfo,
    statusHeight,
    buttonHeight,
  }
}
