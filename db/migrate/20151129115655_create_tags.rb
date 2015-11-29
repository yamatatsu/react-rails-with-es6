class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :color

      t.timestamps null: false
    end
    add_index :tags, :color, unique: true
  end
end
