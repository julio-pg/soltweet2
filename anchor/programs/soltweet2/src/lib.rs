#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod soltweet2 {
    use super::*;

  pub fn close(_ctx: Context<CloseSoltweet2>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.soltweet2.count = ctx.accounts.soltweet2.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.soltweet2.count = ctx.accounts.soltweet2.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeSoltweet2>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.soltweet2.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeSoltweet2<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Soltweet2::INIT_SPACE,
  payer = payer
  )]
  pub soltweet2: Account<'info, Soltweet2>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseSoltweet2<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub soltweet2: Account<'info, Soltweet2>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub soltweet2: Account<'info, Soltweet2>,
}

#[account]
#[derive(InitSpace)]
pub struct Soltweet2 {
  count: u8,
}
