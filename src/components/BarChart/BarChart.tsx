import React, { useEffect, useState, useRef } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import { Paper, Typography } from '@material-ui/core'
import { select, selectAll } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'
import { scaleLinear, scaleBand } from 'd3-scale'
import { max } from 'd3-array'
import styles from './BarChart.module.css'
import { withUnit } from '../../utils/temperatureHelpers'
import { Unit } from '../forecast/forcastSlice'

type Data = {
  time: string
  value: number
}

interface BarChartProps {
  chartId: string
  data: Data[]
  width: number
  height: number
  top: number
  right: number
  bottom: number
  left: number
  fill: string
  suffix: Unit
}

const d3 = {
  select,
  selectAll,
  axisBottom,
  scaleLinear,
  axisLeft,
  scaleBand,
  max
}

const baseTooltipDiamension = { width: 0, height: 0 }
// const temperature = withUnit(formattedValue, unit)

const makeDivId = (str: string) => str.replace(/[^A-Z0-9]+/gi, '').toLowerCase()

const clamp = (min: number, d: number, max: number) => {
  return Math.max(min, Math.min(max, d))
}

const BarChart = ({ chartId = '', data, width, height, left, top, right, bottom, fill, suffix }: BarChartProps) => {
  const [chartWidth, setChartWidth] = useState(width)
  const [chartHeight, setChartHeight] = useState(height)
  const barChartWrapper = useRef<HTMLElement | any>(null)
  const barChart = useRef<HTMLElement | any>(null)
  const chartAreaWidth = chartWidth - left - right
  const chartAreaHeight = chartHeight - top - bottom

  const setDiamensions = (mutation: any) => {
    const [currentMutationObject] = mutation
    const {
      contentRect: { width: contentRectWidth, height: contentRectHeight }
    } = currentMutationObject
    if (contentRectHeight !== chartHeight || contentRectWidth !== chartWidth) {
      setChartWidth(contentRectWidth)
      setChartHeight(contentRectHeight)
    }
  }

  useEffect(() => {
    renderChart()
    return () => {}
  }, [data, chartWidth, chartHeight])

  useEffect(() => {
    const observer = new ResizeObserver(setDiamensions)
    const { current: currentNode } = barChartWrapper
    observer.observe(currentNode)

    return () => {
      observer.unobserve(currentNode)
      observer.disconnect()
    }
  }, [barChartWrapper.current])

  const calculateTooltipDiamension = (event: any) => {
    const tooltipHoverMargin = 16
    const { offsetX: x, offsetY: y } = event
    const tooltipDiamension = document.getElementById(`${chartId}-tooltip`)?.getBoundingClientRect()
    const { width: tooltipWidth, height: tooltipHeight } = tooltipDiamension || baseTooltipDiamension
    const marginLeft = clamp(
      tooltipHoverMargin,
      x + tooltipHoverMargin,
      chartAreaWidth - tooltipWidth - tooltipHoverMargin + left
    )

    const marginTop =
      chartAreaHeight > y + tooltipHoverMargin + tooltipHeight
        ? y + tooltipHoverMargin
        : y - tooltipHeight - tooltipHoverMargin

    return { marginLeft, marginTop }
  }

  function handleMouseOverVoronoiWrapper (event: any) {
    const point = event.target.__data__
    const { marginLeft, marginTop } = calculateTooltipDiamension(event)

    d3.select(`#${chartId}-tooltip`)
      .style('visibility', 'visible')
      .style('top', `${marginTop}px`)
      .style('left', `${marginLeft}px`)

    d3.select(`#${chartId}-point-wrapper .tooltip-title`).text('Temprature')
    d3.select(`#point-ls-${makeDivId(point.time)}`).style('display', 'flex')
    d3.select(`#point-ls-${makeDivId(point.time)} .pointer`)
      .style('background-color', fill)
      .style('display', 'block')
    d3.select(`#point-ls-${makeDivId(point.time)} .point-label`)
      .text(`${point.time}:`)
      .style('display', 'block')
    d3.select(`#point-ls-${makeDivId(point.time)} .point-value`)
      .text(withUnit(point.value, suffix))
      .style('display', 'block')
  }

  function handleMouseMove (event: any) {
    const { marginLeft, marginTop } = calculateTooltipDiamension(event)
    d3.select(`#${chartId}-tooltip`).style('top', `${marginTop}px`).style('left', `${marginLeft}px`)
  }

  const handleMouseOut = () => {
    d3.selectAll('.point-ls').style('display', 'none')
    d3.select(`#${chartId}-tooltip`).style('visibility', 'hidden')
  }

  const renderChart = () => {
    const svgObj = d3.select(barChart.current).select(`#${chartId}-chart-wrapper`)

    const x = d3
      .scaleBand()
      .domain(data.map((d: { time: any }) => d.time))
      .range([0, chartAreaWidth])
      .padding(0.1)

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d: Data) => (d as Data).value)] as number[])
      .nice()
      .rangeRound([chartAreaHeight, 0])

    svgObj
      .selectAll('.bar')
      .data(data)
      .attr('fill', fill)
      .attr('x', (d: { time: any }) => x(d.time) || 0)
      .attr('width', x.bandwidth())
      .attr('y', (d: { value: any }) => y(d.value))
      .attr('height', (d: { value: any }) => chartAreaHeight - y(d.value))
      .on('mouseover', handleMouseOverVoronoiWrapper)
      .on('mousemove', handleMouseMove)
      .on('mouseout', handleMouseOut)

    svgObj
      .select<SVGGElement>('#bottom-axis')
      .attr('transform', `translate(0,${chartAreaHeight})`)
      .call(d3.axisBottom(x))

    svgObj.select<SVGGElement>('#left-axis').call(
      d3
        .axisLeft(y)
        .tickFormat((d) => withUnit(d as any, suffix))
        .ticks(5)
    )
  }

  return (
    <div id="bar-chart-wrapper" data-testid="barChart" className={styles.barChartWrapper} ref={barChartWrapper}>
      <svg id="bar-chart" style={{ width: chartWidth, height: chartHeight }} ref={barChart}>
        <g id={`${chartId}-chart-wrapper`} transform={`translate(${left},${top})`} className="chart-wrapper">
          {data.map((item) => (
            <rect key={`${makeDivId(item.time)}-${Math.random() * 100}`} className="bar" />
          ))}
          <g id="bottom-axis" className={`${styles.axis} ${styles.axisBottom}`} />
          <g id="left-axis" className={styles.axis} />
        </g>
      </svg>
      <Paper id={`${chartId}-tooltip`} className={styles.tooltipWrapper}>
        <div id={`${chartId}-point-wrapper`}>
          <div className="point-title-wrapper" id={`${chartId}-point-title-wrapper`}>
            <Typography variant="button" className="tooltip-title" gutterBottom />
          </div>
          {data.map((item) => (
            <div
              key={`tooltip-item-${makeDivId(item.time)}-${Math.random() * 100}`}
              id={`point-ls-${makeDivId(item.time)}`}
              className={`point-ls ${styles.point}`}
            >
              <div className={styles.pointWrapper}>
                <div className={`pointer ${styles.pointer}`} />
                <Typography variant="subtitle1" className="point-label" />
              </div>
              <Typography variant="button" className="point-value" color="textPrimary" />
            </div>
          ))}
        </div>
      </Paper>
    </div>
  )
}

export default BarChart
