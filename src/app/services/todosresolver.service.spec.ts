import {fakeAsync, inject, TestBed} from '@angular/core/testing';

import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable, of, throwError} from 'rxjs';
import {Todo} from '../models/todo.model';
import {TodosResolverService} from './todosresolver.service';
import {ActivatedRoute, convertToParamMap, Router, RouterStateSnapshot} from '@angular/router';


describe('TodosResolverService: TodoList', () => {

  let todoRService: TodosResolverService;
  let route: ActivatedRoute;

  const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('httpClient', ['get']);

  let mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>("RouterStateSnapshot", ['toString']);

  let router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: Router, useValue: router },
        TodosResolverService,
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: convertToParamMap({id: 133})}}
        },
        {
          provide: HttpClient,
          useValue: httpClientSpy
        }
      ]
    });
  });


  beforeEach(() => {
    route = TestBed.get(ActivatedRoute);
    todoRService = TestBed.get(TodosResolverService);
  });

  it('should be defined', () => {
    expect(todoRService).toBeTruthy();
  });

  it('should resolve', () => {

    httpClientSpy.get.and.returnValue(of(new Todo(133, 'Buy milk', 'Drink milk', 'High',
      '2019-12-09T11:25:42.279542Z', '2019-12-10T11:35:42.279592Z')));

    todoRService.resolve(route.snapshot, mockSnapshot).pipe().subscribe((todo: Todo) => {
      expect(todo.id).toBe(133);
    })
  });

  it('should navigate to not-found', inject([Router], (router: Router) => {
    httpClientSpy.get.and.returnValue(EMPTY);

    expect(todoRService.resolve(route.snapshot, mockSnapshot).subscribe());
    expect(router.navigate).toHaveBeenCalledWith(['/not-found']);
  }));


  // it('should call not-found route', () => {
  //   httpClientSpy.get.and.returnValue(of(null));
  //   // const errorSpy = spyOn(todoRService, 'handleError').and.callThrough();
  //
  //   todoRService.resolve(route.snapshot, mockSnapshot).subscribe((todo: Todo | Observable<never>) => {
  //     // expect(todoRService.handleError()).toHaveBeenCalled();
  //     expect(router.navigate).toHaveBeenCalledWith(['/not-found']);
  //     // expect(errorSpy).toHaveBeenCalled();
  //   })
  // });
});

