"""Fixed Notes again

Revision ID: b50fa121cdaa
Revises: 8ddaaa74e6a7
Create Date: 2022-07-15 17:26:02.316047

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'b50fa121cdaa'
down_revision = '8ddaaa74e6a7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('notes', sa.Column('created_at', sa.TIMESTAMP(timezone=True), nullable=False))
    op.drop_column('notes', 'create_at')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('notes', sa.Column('create_at', postgresql.TIMESTAMP(timezone=True), autoincrement=False, nullable=False))
    op.drop_column('notes', 'created_at')
    # ### end Alembic commands ###