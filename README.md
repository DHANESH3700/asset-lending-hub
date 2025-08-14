# Welcome to asset-lending

## Project info
Project: Aptos Micro-Lending (MVP)
1) Short description (one-liner)
Peer-to-peer micro-loans on Aptos where lenders deposit funds into loan pools and borrowers request small, collateralized loans — all enforced by Move smart contracts.

2) Core features (MVP)
User onboarding via Aptos wallets (e.g., Petra, Martian).

Lender: deposit stablecoin/token into lending pool and choose terms (interest, duration).

Borrower: request loan, optionally provide NFT or token collateral.

Smart contract enforces loan lifecycle: request → approval → disbursement → repayment → liquidate if default.

Interest accrual and repayment tracking on-chain.

Basic UI for creating/listing loans and viewing history.

Admin / oracle-lite for off-chain KYC or credit score (optional, off-chain).

3) High-level architecture
Frontend (React + Aptos SDK) ↔ Aptos Wallet (Petra)
↕
Backend (optional for indexing & off-chain services)
↕
Aptos Blockchain (Move smart contracts for Loans, Collateral, Pools)

Components:

Move Contracts

LoanFactory / LoanManager

LendingPool

Loan (resource per-loan or per-loan-account)

CollateralManager

Token/Stablecoin wrapper (or integrate with existing token)

Frontend

React + TypeScript, Aptos SDK, wallet integration, POAP/NFT viewer

Backend (optional)

Indexer (index transactions & loan state), notifications, KYC, historical analytics

Storage

On-chain: loan state, balances, collateral references.

Off-chain: user profiles (if using KYC), analytics, PDFs.

4) Move smart-contract design — concepts & data model
Key Move resources (high level):

struct LendingPool — holds pool info, token type, total liquidity.

struct LoanRequest — request metadata: borrower, amount, duration, interest_rate, collateral_ref, status.

struct Loan — active loan state: principal, start_ts, due_ts, repaid_amount.

resource Collateral — owner, token_id or amount, locked flag.

module LoanFactory — create pools, accept deposits, create loan requests.

module LoanManager — approve disbursement, accept repayments, liquidate collateral.

Lifecycle (on-chain):

Lender deposits tokens into LendingPool.

Borrower creates LoanRequest with collateral reference.

Loan approved (auto by simple rules or by off-chain oracle / governance).

Disbursement: tokens transferred from pool to borrower; loan resource minted to borrower or recorded under LoanManager.

Repayment: borrower transfers principal + interest back to pool; when paid fully, collateral unlocked.

Default: if past due and not repaid, liquidate can be called to transfer collateral to pool/lender.

5) Example Move contract skeleton (pseudocode / important functions)
(I’ll keep it conceptual — if you want full-contract code I can write it next.)

initialize_pool<Currency>(admin: &signer, min_amount: u64, interest_rate: u64)

deposit(pool_id: u64, user: &signer, amount: u64)

create_loan_request(pool_id: u64, borrower: &signer, amount: u64, duration: u64, collateral: CollateralRef)

approve_loan(pool_id: u64, request_id: u64, approver: &signer) — can be automated with simple checks

disburse_loan(pool_id, request_id)

repay_loan(pool_id, loan_id, payer: &signer, amount: u64)

liquidate_loan(pool_id, loan_id) — if due date passed

Important Move patterns:

Use Move resources to represent loans/collateral (can't be duplicated).

Parametric types for currency (support any Aptos-compatible token).

Safe token transfer patterns to avoid reentrancy-like problems (Move's resource model helps).

6) Frontend stack & integration
Tech: React + TypeScript, Vite, Tailwind CSS (or Chakra), Aptos Web3 SDK (js), Wallet adapters (Petra/Martian).

Pages:

Dashboard (pools, open loans)

Lender page (create pool, deposit, withdraw, view ROI)

Borrower page (request loan, view active loans)

Loan details page (repay, view collateral)

Integrate with Aptos wallet for signing transactions.

Use backend indexer (or directly query Aptos nodes) for faster UX and historical data.

7) Backend & indexing (optional but recommended)
Purpose: index events, store loan metadata for quick search, send notifications.

Tech: Node.js or Python + PostgreSQL; use Aptos REST or indexer like Tendermint/third-party indexers.

Expose REST APIs for frontend to fetch aggregated data.

8) Security & risk considerations
Collateral valuation oracle — for NFT/token price, consider using a vetted price oracle or off-chain oracle service. Initially use fixed-collateral ratios or manual admin approval.

Liquidation safety — implement safeguards: grace period, partial liquidations, collateral auction logic.

Integer overflow / underflow — Move uses fixed-size integers; write careful math (use SafeMath-style checks).

DoS by spam loan requests — require small fee to create requests or rate-limit by wallet.

Upgradability — plan for contract versioning but keep initial version simple to reduce attack surface.

Testing — thorough unit tests in Move, property tests, integration tests with wallets.

Auditing — get third-party audit if handling real value.

9) Testing plan
Unit tests for each Move module: deposit/withdraw, create/approve/disburse/repay/liquidate.

Integration tests: wallet-to-contract flow (simulate lender/borrower).

Fuzz tests for edge cases (very small/large amounts, token decimals).

Frontend E2E (Cypress) for UX flows.

10) Deployment & infra
Deploy contracts to Aptos testnet (devnet) first.

Use CI pipeline to run tests on each PR.

For mainnet: plan gas & treasury for initial liquidity, and small initial loan caps.

11) Monetization & incentives
Interest spread: platform keeps small fee of interest payments.
Origination fee: small fee for each approved loan.
Liquidity mining: incentivize lenders with platform token (advanced feature).
Royalties: small fee on collateral liquidation sales.
