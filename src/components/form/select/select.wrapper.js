import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 're-theme'
import { getOnChangeHandler, getValueFromChildren, getInputValueKey, getReadOnly } from '../../../utils'

/**
 * Gets the key value pair for the select components value
 * @param {*} props - Props passed to the component
 * @param {*} isWeb - Is the platform equal to web
 *
 * @returns {Object} - key / value pair for the select component
 */
const getValue = ({ children, onChange, onValueChange, readOnly, value }, isWeb) => {
  
  const setValue = getValueFromChildren(value, children)

  const valKey = getInputValueKey(isWeb, onChange, onValueChange, readOnly)

  return { [valKey]: setValue }
}

/**
 * Builds the styles for the select component
 * @param {Object} theme - Global theme object
 * @param {string} type - Type of select theme to use
 *
 * @returns {Object} - Contains all built stlyes
 */
const buildStyles = (theme, type) => {
  const select = theme.get(
    'form.select.default',
    type && `form.select.${type}`
  )
  
  return { select }
}

export const SelectWrapper = props => {
  const theme = useTheme()
  const { 
    children,
    editable,
    disabled,
    Element,
    isWeb,
    readOnly,
    onChange,
    onValueChange,
    style,
    type,
    value,
    ...elProps
  } = props
  
  const styles = buildStyles(theme, type)

  return (
    <Element
      elProps={ elProps }
      style={ theme.join(styles.select, style) }
      {  ...getReadOnly(isWeb, readOnly, disabled, editable) }
      { ...getValue(props, isWeb) }
      { ...getOnChangeHandler(isWeb, onChange, onValueChange) }
    >
      { children }
    </Element>
  )

}

SelectWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ]),
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  ref: PropTypes.object,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])
}
