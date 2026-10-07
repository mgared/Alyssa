import { useCallback, useEffect, useState } from 'react'
import { api } from './api'
import { ContentContext } from './content'
import { defaultContent } from '../data/site'

export default function ContentProvider({ children }) {
  const [state, setState] = useState({ projects: [], content: defaultContent, loading: true, error: null })

  const reload = useCallback(async () => {
    try {
      const { projects, content } = await api.loadSite()
      setState({ projects, content, loading: false, error: null })
    } catch (error) {
      setState((s) => ({ ...s, loading: false, error }))
    }
  }, [])

  useEffect(() => {
    // Fetching on mount is the external sync this effect exists for.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reload()
  }, [reload])

  return <ContentContext.Provider value={{ ...state, reload }}>{children}</ContentContext.Provider>
}
