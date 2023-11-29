import { stateMock } from '../../state/mocks/state.mock';
import { CityEntity } from '../entities';

export const cityMock: CityEntity = {
  name: 'kajkass',
  id: 10,
  createdAt: new Date(),
  stateId: stateMock.id,
  updatedAt: new Date(),
  addresses: [],
  state: undefined
};
