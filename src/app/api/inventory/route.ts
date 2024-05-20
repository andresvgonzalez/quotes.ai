import inventory from '../../../../inventory.json';

export const GET = async () => {
  return Response.json(inventory, { status: 200 });
};

export const revalidate = 10;

