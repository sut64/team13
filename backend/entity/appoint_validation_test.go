package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ข้อมูลถูกทั้งหมด
func TestAppointPass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	appoint := Appoint{
		AppointTime: time.Now().Add(24 * time.Hour),
		Room:        2,
		Todo:        "งดอาหาร 2 ชั่วโมง",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(appoint)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

// ตรวจสอบค่าว่างของสิ่งที่ต้องทำแล้วต้องเจอ Error
func TestTodoNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	appoint := Appoint{
		AppointTime: time.Now().Add(24 * time.Hour),
		Room:        2,
		Todo:        "",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(appoint)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Todo cannot be blank"))
}

// ตรวจสอบค่าของห้องที่ใช้รักษาแล้วต้องเจอ Error
func TestRoomNotNegative(t *testing.T) {
	g := NewGomegaWithT(t)

	appoint := Appoint{
		AppointTime: time.Now().Add(24 * time.Hour),
		Room:        -2,
		Todo:        "แปรงฟันก่อนเข้ารับการรักษา",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(appoint)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Room cannot be negative number"))
}

func TestAppointTimeNotBeInThePast(t *testing.T) {
	g := NewGomegaWithT(t)
	appoint := Appoint{
		AppointTime: time.Now().Add(-24 * time.Hour),
		Room:        2,
		Todo:        "แปรงฟันก่อนเข้ารับการรักษา",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(appoint)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Appoint time not be a past"))
}
