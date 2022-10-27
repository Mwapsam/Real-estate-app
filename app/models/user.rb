class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one_attached :photo
  has_many :reviews, foreign_key: :user_id, class_name: 'Review'
  has_many :bookings, foreign_key: :user_id, class_name: 'Booking'
end
