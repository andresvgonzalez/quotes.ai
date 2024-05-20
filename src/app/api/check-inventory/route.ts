import { NextRequest, NextResponse } from 'next/server';
import { checkInventory } from '../../../utils/inventory';

export const POST = async (req: NextRequest) => {
  const { requestedProducts } = await req.json();
  const inventoryStatus = checkInventory(requestedProducts);
  return NextResponse.json(inventoryStatus, { status: 200 });
};
