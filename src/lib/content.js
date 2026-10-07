import { createContext, useContext } from 'react'

export const ContentContext = createContext(null)

// { projects, content, loading, error, reload }
export const useContent = () => useContext(ContentContext)
