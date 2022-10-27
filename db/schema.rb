# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_10_27_120250) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "listings", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.integer "num_guests"
    t.integer "num_beds"
    t.integer "num_baths"
    t.integer "price"
    t.boolean "self_check_in", default: true
    t.boolean "parking", default: false
    t.boolean "kitchen", default: false
    t.boolean "washer", default: false
    t.boolean "dryer", default: false
    t.boolean "dishwasher", default: false
    t.boolean "wifi", default: false
    t.boolean "tv", default: false
    t.boolean "bathroom_essentials", default: false
    t.boolean "bedroom_comforts", default: false
    t.boolean "coffee_maker", default: false
    t.boolean "hair_dryer", default: false
    t.string "location"
    t.text "location_description"
    t.float "lat"
    t.float "long"
    t.integer "host_id"
    t.integer "num_rooms"
    t.string "listing_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
