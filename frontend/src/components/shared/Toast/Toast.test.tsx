import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import Toast from '.'

describe('<Toast/>', () => {
  const onHideToast = jest.fn()

  const renderToast = () =>
    render(<Toast message="Test message" onHideToast={onHideToast} />)

  it('should render message prop', () => {
    renderToast()

    expect(screen.queryByText('Test message')).toBeInTheDocument()
  })

  it('should trigger onHideToast prop', () => {
    renderToast()

    waitFor(() => {
      expect(onHideToast).toHaveBeenCalled()
    })
  })
})
