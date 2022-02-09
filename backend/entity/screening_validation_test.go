package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestIllnessesPass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	screening := Screening{
		Illnesses: "เหงือกอักเสบ",
		Queue:     11,
		Date:      time.Now().Add(-20 * time.Hour),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(screening)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

// ตรวจสอบค่าว่างของชื่อแล้วต้องเจอ Error
func TestIllnessesNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	screening := Screening{
		Illnesses: "", //Illnesses is blank
		Queue:     11,
		Date:      time.Now().Add(-20 * time.Hour),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(screening)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("illnesses cannot be blank"))
}

func TestScreeningTimeNotFuture(t *testing.T) {
	g := NewGomegaWithT(t)
	screening := Screening{
		Illnesses: "เหงือกอักเสบ",
		Queue:     11,
		Date:      time.Now().Add(24 * time.Hour),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(screening)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Screening time not be a future"))
}
func TestScreeningQueue(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []int{
		0,
		-5,
		-99,
	}

	for _, fixture := range fixtures {

		screening := Screening{
			Illnesses: "เหงือกอักเสบ",
			Queue:     fixture,
			Date:      time.Now().Add(-20 * time.Hour),
		}

		ok, err := govalidator.ValidateStruct(screening)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		if err.Error() == "Queue must not be zero or empty" {
			g.Expect(err.Error()).To(Equal("Queue must not be zero or empty"))
		} else if err.Error() == "Queue must not be negative" {
			g.Expect(err.Error()).To(Equal("Queue must not be negative"))
		}

	}
}
