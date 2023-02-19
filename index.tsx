import { createContext, useContext, createEffect, JSX, Accessor, Setter } from 'solid-js'
import { isServer } from 'solid-js/web'
import createLocalSignal from './createLocalSignal'

type Theme = 'system' | 'light' | 'dark'

type ThemeContextModel = {
  theme: Accessor<Theme>
  setTheme: Setter<Theme>
}

type ThemeContextProps = {
  children?: JSX.Element
}

export const ThemeContext = createContext<ThemeContextModel>()

export function ThemeProvider(props: ThemeContextProps) {
  const [theme, setTheme] = createLocalSignal<Theme>({
    initialState: initialState(),
    storageKey: 'theme',
  })

  function initialState() {
    const isStored = !isServer ? JSON.parse(localStorage.getItem('theme')!) : null

    return isStored ? isStored : 'system'
  }

  createEffect(() => {
    const root = document.documentElement

    root.dataset.theme = theme()
    root.style.colorScheme = theme()
  })

  const store = { theme, setTheme }

  return <ThemeContext.Provider value={store}>{props.children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)

const scriptSrc = `!function(){if("undefined"!=typeof window)try{var e=window.matchMedia("(prefers-color-scheme: dark)"),t=document.documentElement,a=JSON.parse(localStorage.getItem('theme'));!a&&e.matches?(t.dataset.theme="dark",t.style.colorScheme="dark"):a?(t.dataset.theme=a,t.style.colorScheme=a):(t.dataset.theme="light",t.style.colorScheme="light")}catch(e){}}();`

export const ThemeScript = () => <script innerHTML={scriptSrc} />
