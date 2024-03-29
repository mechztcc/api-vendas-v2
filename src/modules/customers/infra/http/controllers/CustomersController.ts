import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateCustomerService from '../../../services/CreateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import ListCustomerService from '../../../services/ListCustomerService';
import ShowCustomerService from '../../../services/ShowCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';

class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCostumers = container.resolve(ListCustomerService);

    const customers = await listCostumers.execute();

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showCostumers = container.resolve(ShowCustomerService);

    const customer = await showCostumers.execute({ id });
    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomers = container.resolve(CreateCustomerService);

    const customer = await createCustomers.execute({ name, email });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateCustomers = container.resolve(UpdateCustomerService);
    const customer = await updateCustomers.execute({ id, name, email });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = container.resolve(DeleteCustomerService);

    await deleteCustomer.execute({ id });
    return response.json([]);
  }
}

export default CustomersController;
