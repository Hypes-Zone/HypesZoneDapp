#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod Hypeszonefe {
    use super::*;

  pub fn close(_ctx: Context<CloseHypeszonefe>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.Hypeszonefe.count = ctx.accounts.Hypeszonefe.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.Hypeszonefe.count = ctx.accounts.Hypeszonefe.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeHypeszonefe>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.Hypeszonefe.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeHypeszonefe<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Hypeszonefe::INIT_SPACE,
  payer = payer
  )]
  pub Hypeszonefe: Account<'info, Hypeszonefe>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseHypeszonefe<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub Hypeszonefe: Account<'info, Hypeszonefe>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub Hypeszonefe: Account<'info, Hypeszonefe>,
}

#[account]
#[derive(InitSpace)]
pub struct Hypeszonefe {
  count: u8,
}
