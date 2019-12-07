import { TestBed } from '@angular/core/testing';

import { TodosresolverService } from './todosresolver.service';

describe('TodosresolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodosresolverService = TestBed.get(TodosresolverService);
    expect(service).toBeTruthy();
  });
});
