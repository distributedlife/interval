'use strict';

var expect = require('expect');
var sinon = require('sinon');

var callback = sinon.spy();

var execute = require('../lib/interval').default;

describe('callbacks every interval', function () {
  beforeEach(function () {
    callback.reset();
  });

  it('should call the function every n milliseconds', function () {
    var update = execute(callback).every(15).milliseconds();
    update(0.005);
    expect(callback.callCount).toBe(0);
    update(0.01);
    expect(callback.callCount).toBe(1);
    update(0.01);
    expect(callback.callCount).toBe(1);
    update(0.01);
    expect(callback.callCount).toBe(2);
  });

  it('should call the function every n seconds', function () {
    var update = execute(callback).every(2).seconds();
    update(1.9);
    expect(callback.callCount).toBe(0);
    update(0.1);
    expect(callback.callCount).toBe(1);
    update(2);
    expect(callback.callCount).toBe(2);
  });

  it('should call the function every n minutes', function () {
    var update = execute(callback).every(1).minute();
    update(59.999);
    expect(callback.callCount).toBe(0);
    update(0.001);
    expect(callback.callCount).toBe(1);
    update(60);
    expect(callback.callCount).toBe(2);
  });

  it('should call the function every n hours', function () {
    var update = execute(callback).every(3).hours();
    update(10799.999);
    expect(callback.callCount).toBe(0);
    update(0.001);
    expect(callback.callCount).toBe(1);
    update(10800);
    expect(callback.callCount).toBe(2);
  });

  it('should call the function every n calls', function () {
    var update = execute(callback).every(5).calls();
    update(0.0);
    update(0.0);
    update(0.0);
    update(0.0);
    expect(callback.callCount).toBe(0);
    update(0.0);
    expect(callback.callCount).toBe(1);
    update(0.0);
    update(0.0);
    update(0.0);
    update(0.0);
    expect(callback.callCount).toBe(1);
    update(0.0);
    expect(callback.callCount).toBe(2);
  });
});

describe('passing through parameters', function () {
  beforeEach(function () {
    callback.reset();
  });

  it('should work for call counts', function () {
    var update = execute(callback).every(2).calls();
    update(1, 2, 3);
    expect(callback.callCount).toBe(0);
    update(4, 5, 6);
    expect(callback.firstCall.args).toEqual([4, 5, 6]);
  });

  it('should work for time based sampling', function () {
    var update = execute(callback).every(5).milliseconds();
    update(0.003, 1, 2, 3);
    expect(callback.callCount).toBe(0);
    update(0.002, 4, 5, 6);
    expect(callback.firstCall.args).toEqual([0.002, 4, 5, 6]);
  });
});

describe('callbacks about n times an interval', function () {
  beforeEach(function () {
    callback.reset();
  });

  it('should call the function n times a second', function () {
    var update = execute(callback).about(5).timesPer.second();
    update(0.199);
    expect(callback.callCount).toBe(0);
    update(0.001);
    expect(callback.callCount).toBe(1);
    update(0.200);
    expect(callback.callCount).toBe(2);
  });

  it('should call the function n times a minute', function () {
    var update = execute(callback).about(5).timesPer.minute();
    update(11.999);
    expect(callback.callCount).toBe(0);
    update(0.001);
    expect(callback.callCount).toBe(1);
    update(12);
    expect(callback.callCount).toBe(2);
  });

  it('should call the function n times an hour', function () {
    var update = execute(callback).about(5).timesPer.hour();
    update(719.999);
    expect(callback.callCount).toBe(0);
    update(0.001);
    expect(callback.callCount).toBe(1);
    update(720);
    expect(callback.callCount).toBe(2);
  });
});