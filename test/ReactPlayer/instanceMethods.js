import React from 'react'
import test from 'ava'
import sinon from 'sinon'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ReactPlayer from '../../src/ReactPlayer'

configure({ adapter: new Adapter() })

const COMMON_METHODS = ['getDuration', 'getCurrentTime', 'getSecondsLoaded', 'getInternalPlayer']

for (const method of COMMON_METHODS) {
  test(`${method}()`, t => {
    const instance = shallow(<ReactPlayer />).instance()
    instance.setRef.player({ [method]: () => 123 })
    t.true(instance[method]() === 123)
  })

  test(`${method}() - null`, t => {
    const instance = shallow(<ReactPlayer />).instance()
    t.true(instance[method]() === null)
  })
}

test('getInternalPlayer() - default', t => {
  const instance = shallow(<ReactPlayer />).instance()
  const getInternalPlayer = sinon.fake.returns('abc')
  instance.setRef.player({ getInternalPlayer })
  t.true(instance.getInternalPlayer() === 'abc')
  t.true(getInternalPlayer.calledOnceWith('player'))
})

test('seekTo()', t => {
  const instance = shallow(<ReactPlayer />).instance()
  instance.setRef.player({ seekTo: sinon.fake() })
  instance.seekTo(5)
  t.true(instance.player.seekTo.calledOnce)
  t.true(instance.player.seekTo.calledWith(5))
})

test('seekTo() - null', t => {
  const instance = shallow(<ReactPlayer />).instance()
  t.true(instance.seekTo() === null)
})

test('onReady()', t => {
  const onReady = sinon.fake()
  const instance = shallow(<ReactPlayer onReady={onReady} />).instance()
  instance.handleReady()
  t.true(onReady.calledWith(instance))
})

test('setRef', t => {
  const instance = shallow(<ReactPlayer />).instance()
  instance.setRef.player('abc')
  instance.setRef.wrapper('def')
  t.true(instance.player === 'abc')
  t.true(instance.wrapper === 'def')
})
