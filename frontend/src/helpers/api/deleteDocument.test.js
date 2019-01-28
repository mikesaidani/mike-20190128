import { expect } from 'chai';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import deleteDocument from './deleteDocument';

const mockAxios = new MockAdapter(axios);

describe('deleteDocument()', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('deletes a document successfully', async () => {
    mockAxios.onDelete().reply(200, {});

    const res = await deleteDocument();

    expect(res).to.be.an('array').that.has.lengthOf(2);
    expect(res[0]).to.not.eq(null);
    expect(res[1]).to.be.eq(null);
  });

  it('returns error on failure', async () => {
    mockAxios.onDelete().reply(400, {});

    const res = await deleteDocument();
    expect(res).to.be.an('array').that.has.lengthOf(2);
    expect(res[0]).to.eq(null);
    expect(res[1]).to.not.eq(null);
  });
});
