import { ApiService } from './api-service.service';
import { HttpClientProvider } from '../../providers/api/HttpClientProvider';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('UnitTestService', () => {
  let service: ApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let url = 'https://jsonplaceholder.typicode.com/';
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
    service = new ApiService(new HttpClientProvider(httpClientSpy), url);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should do a get', ()=> {
    const data = {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "body": "false"
    };
    httpClientSpy.get.and.returnValue(of(data))
    service.get('posts/1')
    .subscribe(value => {
      expect(value).toEqual(data);
    })

  });

  it('should do a post', ()=> {
    const data = {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "body": "false"
    };
    httpClientSpy.post.and.returnValue(of(data))
    service.post('posts', data)
    .subscribe(value => {
      expect(value).toEqual(data);
    })

  });

  it('should do a pacth', ()=> {
    const data = {
        "title": "delectus aut autem",
      };
      httpClientSpy.patch.and.returnValue(of(data))
      service.patch('pacth', data)
      .subscribe(value => {
        expect(value).toEqual(data);
      })
  });

  it('should do a put', ()=> {
      const data = {
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1
      };
      httpClientSpy.put.and.returnValue(of(data))
      service.put('put', data)
      .subscribe(value => {
        expect(value).toEqual(data);
      })
  });

  it('should do a delete', ()=> {
        const data = {
            userId: 1
        };
        httpClientSpy.delete.and.returnValue(of(data))
        service.delete('posts?userId=1')
        .subscribe(value => {
        expect(value).toEqual(data);
        })
  });
});