"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findByAPI = exports.findAllByDisplayValue = exports.findByDisplayValue = exports.findAllByPlaceholderText = exports.findByPlaceholderText = exports.findAllByText = exports.findByText = exports.findAllByTestId = exports.findByTestId = void 0;

var _waitFor = _interopRequireDefault(require("../waitFor"));

var _getByAPI = require("./getByAPI");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeFindQuery = (instance, getQuery, text, waitForOptions) => (0, _waitFor.default)(() => getQuery(instance)(text), waitForOptions);

const findByTestId = instance => (testId, waitForOptions = {}) => makeFindQuery(instance, _getByAPI.getByTestId, testId, waitForOptions);

exports.findByTestId = findByTestId;

const findAllByTestId = instance => (testId, waitForOptions = {}) => makeFindQuery(instance, _getByAPI.getAllByTestId, testId, waitForOptions);

exports.findAllByTestId = findAllByTestId;

const findByText = instance => (text, waitForOptions = {}) => makeFindQuery(instance, _getByAPI.getByText, text, waitForOptions);

exports.findByText = findByText;

const findAllByText = instance => (text, waitForOptions = {}) => makeFindQuery(instance, _getByAPI.getAllByText, text, waitForOptions);

exports.findAllByText = findAllByText;

const findByPlaceholderText = instance => (placeholder, waitForOptions = {}) => makeFindQuery(instance, _getByAPI.getByPlaceholderText, placeholder, waitForOptions);

exports.findByPlaceholderText = findByPlaceholderText;

const findAllByPlaceholderText = instance => (placeholder, waitForOptions = {}) => makeFindQuery(instance, _getByAPI.getAllByPlaceholderText, placeholder, waitForOptions);

exports.findAllByPlaceholderText = findAllByPlaceholderText;

const findByDisplayValue = instance => (value, waitForOptions = {}) => makeFindQuery(instance, _getByAPI.getByDisplayValue, value, waitForOptions);

exports.findByDisplayValue = findByDisplayValue;

const findAllByDisplayValue = instance => (value, waitForOptions = {}) => makeFindQuery(instance, _getByAPI.getAllByDisplayValue, value, waitForOptions);

exports.findAllByDisplayValue = findAllByDisplayValue;

const findByAPI = instance => ({
  findByTestId: findByTestId(instance),
  findByText: findByText(instance),
  findByPlaceholderText: findByPlaceholderText(instance),
  findByDisplayValue: findByDisplayValue(instance),
  findAllByTestId: findAllByTestId(instance),
  findAllByText: findAllByText(instance),
  findAllByPlaceholderText: findAllByPlaceholderText(instance),
  findAllByDisplayValue: findAllByDisplayValue(instance),
  // Renamed
  findByPlaceholder: () => (0, _errors.throwRenamedFunctionError)('findByPlaceholder', 'findByPlaceholderText'),
  findAllByPlaceholder: () => (0, _errors.throwRenamedFunctionError)('findAllByPlaceholder', 'findAllByPlaceholderText')
});

exports.findByAPI = findByAPI;