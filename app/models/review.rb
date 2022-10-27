class Review < ApplicationRecord
  belongs_to :user,
    foreign_key: :user_id,
    class_name: 'User'

  belongs_to :listing,
    foreign_key: :listing_id,
    class_name: 'Listing'

    def self.get_by_listing_id(listing_id)
      self.where("listing_id = ?", listing_id)
    end
end
