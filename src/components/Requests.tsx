interface RequestsParams {
  quantity: number;
}

export function Requests({ quantity }: RequestsParams) {
  return (
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-xl">Solicitações</h3>
      <span className="text-base text-gray-200">{quantity}</span>
    </div>
  );
}
