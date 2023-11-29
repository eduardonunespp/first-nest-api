import { Test, TestingModule } from '@nestjs/testing';
import { StateService } from '../state.service';
import { Repository } from 'typeorm';
import { StateEntity } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { stateMock } from '../mocks/state.mock';

describe('StateService', () => {
  let service: StateService;
  let stateRepository: Repository<StateEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: getRepositoryToken(StateEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(stateMock)
          }
        }
      ]
    }).compile();

    service = module.get<StateService>(StateService);
    stateRepository = module.get<Repository<StateEntity>>(
      getRepositoryToken(StateEntity)
    );
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    expect(stateRepository).toBeDefined();
  });

  it('should return list of states', async () => {
    const state = await service.getAllState();

    expect(state).toEqual(stateMock);
  });

  it('should return error in exception', async () => {
    jest.spyOn(stateRepository, 'find').mockRejectedValueOnce(new Error());

    expect(service.getAllState()).rejects.toThrowError();
  });
});
