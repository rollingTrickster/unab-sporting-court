"""Add rut column to users

Revision ID: b1c2d3e4f5a6
Revises: 877c22727253
Create Date: 2025-11-19 18:30:00.000000
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'b1c2d3e4f5a6'
down_revision = '877c22727253'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add 'rut' column as nullable first
    op.add_column('users', sa.Column('rut', sa.String(), nullable=True))
    # Copy existing data from 'email' to 'rut' when possible
    op.execute("UPDATE users SET rut = email WHERE rut IS NULL;")
    # Create unique index on rut
    op.create_index(op.f('ix_users_rut'), 'users', ['rut'], unique=True)
    # Now that values have been populated, set column to NOT NULL
    op.alter_column('users', 'rut', nullable=False)


def downgrade() -> None:
    # Remove rut column and its index
    op.drop_index(op.f('ix_users_rut'), table_name='users')
    op.drop_column('users', 'rut')
