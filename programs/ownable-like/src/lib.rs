use anchor_lang::prelude::*;
use std::mem::size_of;

declare_id!("HNWCbjmHgVX28RQLXHHPYeQsRccNUGwAW5xBmdqKcW1f");

#[program]
pub mod ownable_like {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        ctx.accounts.storage.authority = ctx.accounts.signer.key();
        msg!("Owner is: {:?}", ctx.accounts.storage.authority);
        Ok(())
    }

    pub fn is_owner(ctx: Context<IsOwner>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        if ctx.accounts.storage.authority != ctx.accounts.signer.key() {
            msg!("Not the owner");
        } else {
            msg!("Owner is: {:?}", ctx.accounts.storage.authority);
        }
        Ok(())
    }
}

#[derive(Accounts)]
pub struct IsOwner<'info> {
    pub storage: Account<'info, Storage>,
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = signer,
        space = 8 + size_of::<Storage>(),
    )]
    pub storage: Account<'info, Storage>,
    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct Storage {
    authority: Pubkey,
}
