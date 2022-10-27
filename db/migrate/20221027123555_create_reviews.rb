class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.text :review
      t.integer :rating
      t.integer :accuracy
      t.integer :communication
      t.integer :cleanliness
      t.integer :location
      t.integer :check_in
      t.integer :value
      t.references :user, null: false, foreign_key: true
      t.references :listing, null: false, foreign_key: true

      t.timestamps
    end
  end
end
