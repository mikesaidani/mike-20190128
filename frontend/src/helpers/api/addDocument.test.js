import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import addDocument from './addDocument';

const mockAxios = new MockAdapter(axios);

describe('addDocument()', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('add a document successfully', async () => {
    mockAxios.onPost().reply(201, {});

    const res = await addDocument();

    expect(res).to.be.an('array').that.has.lengthOf(2);
    expect(res[0]).to.not.eq(null);
    expect(res[1]).to.be.eq(null);
  });

  it('returns error on failure', async () => {
    mockAxios.onPost().reply(400, {});

    const res = await addDocument();
    expect(res).to.be.an('array').that.has.lengthOf(2);
    expect(res[0]).to.eq(null);
    expect(res[1]).to.not.eq(null);
  });
});
