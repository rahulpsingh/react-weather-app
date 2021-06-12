import React from 'react'
import { screen, RenderResult } from '@testing-library/react'
import '../../../__mocks__/resizeObserver'
import { render } from '../../test-utils'
import BarChart from './BarChart'

describe('BarChart component', () => {
  let unmount: RenderResult['unmount']

  beforeEach(() => {
    const result = render(
      <BarChart
        chartId="test-chart"
        data={[]}
        top={10}
        right={50}
        bottom={50}
        left={50}
        width={600}
        height={400}
        fill="red"
        suffix="celsius"
      />
    )
    ;({ unmount } = result)
  })

  afterEach(() => unmount())

  test('Should be visible', () => {
    expect(screen.getByTestId('barChart')).toBeVisible()
  })
})
