use anchor_lang::prelude::*;

declare_id!("E7Sf9yQ3b6vvKv8GM6CdZDivBPh5JEDkuUNVa7cCGNMm");

#[program]
pub mod pubkey_vector {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn set_array(ctx: Context<SetArray>, users: Vec<Pubkey>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        ctx.accounts.storage.user = users;
        for user in ctx.accounts.storage.user.iter() {
            msg!("User: {:?}", user);
        }
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = signer,
        space = 8 + Storage::MAX_SIZE,
    )]
    pub storage: Account<'info, Storage>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SetArray<'info> {
    #[account(mut)]
    pub storage: Account<'info, Storage>,
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Storage {
    // Max 3 capacity
    pub user: Vec<Pubkey>,
}

impl Storage {
    pub const MAX_SIZE: usize = (4 + 3 * 32);
}