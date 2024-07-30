use anchor_lang::prelude::*;

declare_id!("5g4ZntfHahpwUHvdGcKiBfQLjqzC9T8CY44GBTp8xygU");

#[program]
pub mod first_try {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn some_func(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings some func from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
