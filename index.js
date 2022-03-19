}

// TransactionReader provides access to past transactions and their receipts.
// Implementations may impose arbitrary restrictions on the transactions and receipts that
// can be retrieved. Historic transactions may not be available.
//
// Avoid relying on this interface if possible. Contract logs (through the LogFilterer
// interface) are more reliable and usually safer in the presence of chain
// reorganisations.
//
// The returned error is NotFound if the requested item does not exist.
type TransactionReader interface {
	// TransactionByHash checks the pool of pending transactions in addition to the
	// blockchain. The isPending return value indicates whether the transaction has been
	// mined yet. Note that the transaction may not be part of the canonical chain even if
	// it's not pending.
	TransactionByHash(ctx context.Context, txHash common.Hash) (tx *types.Transaction, isPending bool, err error)
	// TransactionReceipt returns the receipt of a mined transaction. Note that the
	// transaction may not be included in the current canonical chain even if a receipt
	// exists.
	TransactionReceipt(ctx context.Context, txHash common.Hash) (*types.Receipt, error)
}
