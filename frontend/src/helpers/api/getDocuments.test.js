import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import getDocuments from './getDocuments';

const mockAxios = new MockAdapter(axios);

describe('getDocuments()', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('fetches documents successfully', async () => {
    const doc = {
      _id: '1',
      name: 'file',
      size: 2000
    };

    mockAxios.onGet().reply(200, [doc]);

    const res = await getDocuments();
    expect(res).to.be.an('array').that.has.lengthOf(2);
    expect(res[0]).to.be.an('array').that.has.lengthOf(1);
    expect(res[1]).to.be.eq(null);
  });

  it('returns an error on failure', async () => {
    mockAxios.onGet().reply(400, {});

    const res = await getDocuments();
    expect(res).to.be.an('array').that.has.lengthOf(2);
    expect(res[0]).to.be.eq(null);
    expect(res[1]).to.not.be.eq(null);
  });
});
