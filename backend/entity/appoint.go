package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type RemedyType struct {
	gorm.Model
	Name      string
	Appoints  []Appoint   `gorm:"foreignKey:RemedyTypeID"`
	Treatment []Treatment `gorm:"foreignKey:RemedyTypeID"`
	Payments  []Payment   `gorm:"foreignKey:RemedyTypeID"`
}

type Appoint struct {
	gorm.Model
	AppointTime time.Time `valid:"future~Appoint time not be a past"`
	Room        int       `valid:"appoint_positive~Room cannot be negative number"`
	Todo        string    `valid:"required~Todo cannot be blank"`

	DentistID *uint
	Dentist   User `gorm:"references:id" valid:"-"`

	PatientID *uint
	Patient   Patient `gorm:"references:id" valid:"-"`

	RemedyTypeID *uint
	RemedyType   RemedyType `gorm:"references:id" valid:"-"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now()
		return now.After(t)
	})

	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		now := time.Now()
		return now.Before(t)
	})

	govalidator.CustomTypeTagMap.Set("Now", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Equal(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("appoint_positive", func(i interface{}, context interface{}) bool {
		num := i
		return num.(int) >= 0
	})
}
