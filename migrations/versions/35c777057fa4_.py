"""empty message

Revision ID: 35c777057fa4
Revises: 9f0cb87574db
Create Date: 2022-07-24 19:53:50.506792

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '35c777057fa4'
down_revision = '9f0cb87574db'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('username', sa.String(length=120), nullable=False))
    op.add_column('user', sa.Column('registration_date', sa.DateTime(), nullable=True))
    op.create_unique_constraint(None, 'user', ['username'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='unique')
    op.drop_column('user', 'registration_date')
    op.drop_column('user', 'username')
    # ### end Alembic commands ###
