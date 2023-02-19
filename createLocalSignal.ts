import { createSignal, createEffect, Accessor, Setter } from 'solid-js'
import { isServer } from 'solid-js/web'

type CreateLocalSignal<T> = { initialState: T; storageKey: string }

function createLocalSignal<T>({ initialState, storageKey }: CreateLocalSignal<T>): [Accessor<T>, Setter<T>] {
  const [state, setState] = createSignal<T>(initialState)

  if (!isServer && localStorage[storageKey]) {
    setState(JSON.parse(localStorage[storageKey]))
  }

  createEffect(() => (localStorage[storageKey] = JSON.stringify(state())))

  return [state, setState]
}

export default createLocalSignal
