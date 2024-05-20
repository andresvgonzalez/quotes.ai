import { NextResponse } from 'next/server';
import inventory from '../../../../inventory.json';

export const GET = async () => {
  return NextResponse.json(inventory, { status: 200 });
};
