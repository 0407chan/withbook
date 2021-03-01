import React from 'react'

type MaybeProps = {
  is: boolean
}

export const Maybe: React.FC<MaybeProps> = ({ is, children }) => (
  <>{is ? children : null}</>
)

export const IfExists: React.FC = ({ children }) => <>{children ?? null}</>
