// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import path from 'path'
import '@testing-library/jest-dom'
import dotenv from 'dotenv'
import 'resize-observer-polyfill'

dotenv.config({ path: path.resolve('../.env.test.local') })
