SolidJS dark/light theme.

# Use (Solid Start)

in root.tsx:

```
  import { ThemeProvider, ThemeScript } from 'path/to/ThemeContext'

  <Head>
    ...
    <ThemeScript />
  </Head>


  <AnimationProvider>
    <Routes>
      <FileRoutes />
    </Routes>
  </AnimationProvider>
```

In some route where you want to make a theme toggle and/or access the current theme (if using SSR, check app is mounted before accessing current theme):

```
  import { createSignal, onMount, Show } from 'solid-js'
  import { useTheme } from 'path/to/ThemeContext'

  const { theme, setTheme } = useTheme()!
  const [mounted, setMounted] = createSignal(false)

  function onClick() {
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'))
  }

  return (
    <>
      <button onClick={onClick}>Change theme</button>

      <Show when={mounted()} fallback={<p>Loading...</p>}>
        <p>Current theme is {theme()}</p>
      </Show>
    </>
  )
```




