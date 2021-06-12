import React from 'react'
import { screen, RenderResult } from '@testing-library/react'
import { render } from '../../test-utils'
import { pushAlertMessage, clearAlertMessage } from '../../services/alert.service'
import App from '../../features/app/App'

describe('Alert component', () => {
  let unmount: RenderResult['unmount']

  beforeEach(() => {
    const result = render(<App />);
    ({ unmount } = result)
  })

  afterEach(() => unmount())

  test('Should visible when it has a message', () => {
    const message = 'Test message'
    pushAlertMessage(message)
    expect(screen.getByText(message)).toBeVisible()
    clearAlertMessage()
    expect(screen.queryByText(message)).toBeNull()
  })
})
